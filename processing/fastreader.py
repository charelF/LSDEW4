import pandas as pd
import bz2

def fastreader(input_file, output_file, maxlines = 10 * 1000 * 1000 * 1000):
    """ fastest way to convert original wikipedia file into cleaned parquet
        - processing speed: ~250K lines per second

        input:
        - input_file:
            - uncompressed (or compressed) file from wikipedia
            - example: "../data/pageviews-20210101-automated"
            - it is important that the filename is exactly as in the article, so pageviews-[date]-[traffic_type] and without extension (no .txt)
        - output_file:
            - must either end in ".parquet" or be a directory
            - if its a directory, then the inputfilename is used and the file is written to the directory
            - example: "../data/temp/out.parquet"
            - example: "../data/temp/" --> directory --> outputfile will be: "../data/temp/[input_file_name].parquet"
        - maxlines: the max number of rows, safety feature for testing on big files. 
    """
    
    code_to_hour_dic = {letter:str(num) for num,letter in enumerate("ABCDEFGHIJKLMNOPQRSTUVWXYZ")}

    input_file_name = input_file.split("/")[-1]
    input_file_name_components = input_file_name.split("-")
    traffic_type = input_file_name_components[2]
    yyyymmdd = input_file_name_components[1]

    if output_file.endswith("/"):
        # output file is a directory
        output_file = output_file + input_file_name + ".parquet"

    if not (output_file.endswith(".parquet")):
        print("ERROR: outputfile is not a valid parquet file!")

    if input_file.endswith(".bz2"):
        openfile = lambda x: bz2.open(x, mode="rt")
    else:
        openfile = open

    outlist = []

    print(f"begin processing on file: {input_file}")
    with openfile(input_file) as infile:
        for i, line in enumerate(infile):

            if (i > maxlines):  # early stop
                break
            if (i > 0) and ((i % 1000000) == 0):  # progress
                print(f"lines read: {i//1000000}M")

            # split line into list of words
            wordlist = line.split(" ")
            if len(wordlist) == 5:
                # the case where we do not have an ID
                wordlist.insert(2, "null")

            # replace all null IDs by simply -1 so its numeric
            if wordlist[2] == "null":
                wordlist[2] = "-1"

            wordlists = []
            count = ""
            time = ""
            first = True
            for symbol in wordlist[-1]:
                if symbol.isalpha():
                    if not first:
                        # if this is not the first iteration, count is a valid number and time has also been set
                        # since its not the first, we just encountered a letter again, hence we write to the wordlists
                        # we write the original list, without the A1B2C3 string and instead encoding the first pair A1 to time: 0, count: 1
                        wordlists.append(wordlist[:-1] + [time, count])
                        count = ""
                    else: first = False  # if it was the first, the next one wont be the first
                    # in any case we get the time                    
                    time = code_to_hour_dic[symbol]
                elif symbol.isnumeric():
                    count += symbol
                elif symbol == "\n":
                    # we arrived at the end
                    wordlists.append(wordlist[:-1] + [time, count])
                    break
            # now we have a wordlists which contains the counts split by hour
            outlist += wordlists

    print("convert list to dataframe")
    # now we put outlist into a pandas DataFrame and then save as parquet
    df = pd.DataFrame(outlist, columns=["domain", "title", "id", "access_type", "total", "hour", "count"])

    df["year"] = yyyymmdd[0:4]
    df["month"] = yyyymmdd[4:6]
    df["day"] = yyyymmdd[6:8]
    df["traffic_type"] = traffic_type

    # TODO: optimise data types
    # e.g. ID used to be a string, but now we could make it a signed integer etc
    # traffic_type and access_type could both be stored with 2 bits, so we can greatly reduce

    print(f"write parquet to file: {output_file} (may take some time due to partitioning)")
    df.to_parquet(output_file, partition_cols=["year", "month", "day"])
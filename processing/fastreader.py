# outstring = ""
# max_iterations = 10 * 1000 * 100

# code_to_hour_dic = {letter:str(num) for num,letter in enumerate("ABCDEFGHIJKLMNOPQRSTUVWXYZ")}

# with open(bigfilepath) as infile:
#     for i, line in tqdm(enumerate(infile)):
#         # split line into list of words
#         wordlist = line.split(" ")

#         if len(wordlist) == 6:
#             # the case where we have an ID
#             if wordlist[3].isnumeric():
#                 # the case where ID is at correct position
#                 continue
#             else:
#                 # since there is an ID, we need to check if it is null or whether it is the article title and is switched with id
#                 # null 1234 --> article is null, with ID 1234 --> UNSOVABLY AMBIGIOUS
#                 # 1234 null --> article is 1234, with ID null --> UNSOVABLY AMBIGIOUS
#                 # --> for the above case, we will simply take as is, and hope its correct
#                 # abcd null --> article is abcd, with ID null
#                 # null abcd --> article is abcd, with ID null, places were switched
#                 pass  # for now
#         else:
#             # the case where we do not have an ID
#             wordlist.insert(2, "null")

#         # now we divide to days
#         wordlists = []

#         # divide last string into separate entries
#         count = ""
#         time = ""
#         first = True
#         for symbol in wordlist[-1]:
#             if symbol.isalpha():
#                 if not first:
#                     # if this is not the first iteration, count is a valid number and time has also been set
#                     # since its not the first, we just encountered a letter again, hence we write to the wordlists
#                     # we write the original list, without the A1B2C3 string and instead encoding the first pair A1 to time: 0, count: 1
#                     wordlists.append(wordlist[:-1] + [time, count])
#                     count = ""
#                 else: first = False  # if it was the first, the next one wont be the first
#                 # in any case we get the time                    
#                 time = code_to_hour_dic[symbol]
#             elif symbol.isnumeric():
#                 count += symbol
#             elif symbol == "\n":
#                 # we arrived at the end
#                 wordlists.append(wordlist[:-1] + [time, count])
#                 break
#         # now we have a wordlists which contains the counts split by hour

#         # recombine cleaned list of words into line
#         for wordlist in wordlists:
#             print(wordlist)
#             outstring += " ".join(wordlist) + "\n"
#         if i > max_iterations:
#             break

# with open(outputfilepath, "w") as outfile:
#     outfile.write(outstring)
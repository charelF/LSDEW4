from bs4 import BeautifulSoup
import requests
import re
import json
from pathlib import Path


def fetch_file_listing(url):
    print(f"Fetch {url}")
    resp = requests.get(url).text
    lines = resp.strip().split("\r\n")
    table = [re.split("\s{2,}", line) for line in lines if line.startswith("<a")]
    results = []
    for row in table:
        link, date, size = row
        href = BeautifulSoup(link, "lxml").find("a")['href']
        if href.endswith("/"):
            results.extend(fetch_file_listing(url + href))
        else:
            results.append({"file": url + href, "date": date, "size": int(size)})
    return results


def main():
    base_url = "https://dumps.wikimedia.org/other/pageview_complete/"
    if not Path("sizes.json").exists():
        file_metadata = fetch_file_listing(base_url)
        f = open("sizes.json", "w")
        f.write(json.dumps(file_metadata))
        f.close()

    # Complete dataset size
    files = json.loads(open("sizes.json").read())
    total_size = sum([file['size'] for file in files])

    print(f"Total size:               {total_size // (2**30)} GiB")
    total_size = 0
    ranges = [f"pageview_complete/20{n}" for n in range(15, 22)]
    for file in files:
        for r in ranges:
            if r in file['file']:
                total_size += file['size']

    print(f"Hourly files total size:  {total_size // (2**30)} GiB")

    total_size = 0
    ranges = [f"pageview_complete/monthly/20{n}" for n in range(15, 22)]
    for file in files:
        for r in ranges:
            if r in file['file']:
                total_size += file['size']

    print(f"Monthly files total size: {total_size // (2**30)} GiB")

if __name__ == "__main__":
    main()


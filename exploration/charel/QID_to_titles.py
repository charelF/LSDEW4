# %%
import numpy as np
import requests
# %%
def wikidata_qid_to_titles(qid):
    url = f"https://www.wikidata.org/wiki/Special:EntityData/{qid}.json"
    titles = []
    with requests.get(url, stream=True) as r:
        content = r.json()
        for _, sitedic in content["entities"][qid]["sitelinks"].items():
            titles.append(sitedic["title"])
    return titles
# %%
def main():
    qid = "Q131406"
        # denial-of-service attack
        # https://www.wikidata.org/wiki/Q131406
    qid = "Q17329819"
        # distributed denial-of-service attack
        # https://www.wikidata.org/wiki/Q17329819
        # only available in very few (5) languages, not on en.wikipedia

    print(wikidata_qid_to_titles(qid))

if __name__ == "__main__":
    main()
# %%


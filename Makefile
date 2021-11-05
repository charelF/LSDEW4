all: clean submission

clean:
	rm -fr ../submission
	rm -fr submission_group09.tar.gz

submission:
	cp -r ../project ../submission
	rm -fr  ../submission/website/.next ../submission/website/node_modules
	cd ../submission && git clean -f -X
	rm -fr ../submission/.git
	rm ../submission/Makefile
	cd ../submission/website && yarn && EXPORT_MODE=submission yarn build && yarn run next export && mv out ../website_output && cd -
	echo "| website_output     | Compiled website source, ready for hosting                                                       |" >> ../submission/README.md
	rm -rf ../submission/website/node_modules ../submission/website/.next
	tar -czvf submission_group09.tar.gz ../submission

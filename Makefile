all: clean submission

clean:
	rm -fr ../submission

submission:
	cp -r ../project ../submission
	rm -fr ../submission/.git ../submission/website/.next ../submission/website/node_modules
	rm ../submission/Makefile

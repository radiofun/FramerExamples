update:
	python Scripts/update-framer.py

update%framer:
	make update:framer

convert:
	python Scripts/coffee2js.py

site:
	make convert

	rm -Rf FramerExamplesSite/static/examples/*
	cp -Rf Examples/*.framer FramerExamplesSite/static/examples/

	python Scripts/zip-projects.py

site%upload:
	cd FramerExamplesSite; cactus deploy

optimize:
	cd Examples; find . -name "*.png" -exec optipng -o3 {} \;

.PHONY: update
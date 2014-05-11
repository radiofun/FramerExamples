update:
	python Scripts/update-framer.py

update%framer:
	make update:framer

convert:
	python Scripts/coffee2js.py

.PHONY: update
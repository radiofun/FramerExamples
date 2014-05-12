import sys
import os
import tempfile
import shutil

def run(command):
	os.system(command)

path = os.path.join(os.path.dirname(__file__), "..", "FramerExamplesSite", "static", "examples")
path = os.path.abspath(path)

for fileName in os.listdir(path):
	
	filePath = os.path.join(path, fileName)

	if not filePath.endswith(".framer"):
		continue

	print "Zipping example project '%s'" % filePath

	run("cd '%s'; zip -r '%s.zip' '%s'" % (path, fileName, fileName))
import sys
import os

def run(command):
	os.system(command)

path = os.path.join(os.path.dirname(__file__), "..")
path = os.path.abspath(path)

def downloadFile(url, path):
	os.system("curl -# '%s' | gzip -d > '%s'" % (url, path))

for fileName in os.listdir(path):
	
	filePath = os.path.join(path, fileName)

	if not filePath.endswith(".framer"):
		continue

	print "Updating Framer in '%s'" % filePath

	downloadFile(
		"http://builds.framerjs.com/latest/framer.js",
		os.path.join(filePath, "framer", "framer.js"))

	downloadFile(
		"http://builds.framerjs.com/latest/framer.js.map",
		os.path.join(filePath, "framer", "framer.js.map"))
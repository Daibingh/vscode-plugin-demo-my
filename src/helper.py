import os
import sys
import re
import json

def process(file_name):
	text = None
	with open(file_name, encoding='utf-8') as f:
		text = f.read()
	if text is None: sys.exit(1)
	res = re.findall(r'#ifndef\s+(__.*?__)', text)	
	new = os.path.split(file_name)[1].split('.')[0].upper() + "_H"
	ret = {'patten': '', 'occur': 0, 'repl': new, 'content': ''}
	if len(res) > 0:
		ret['patten'] = res[0] 
		ret['occur'] = text.count(res[0]) 
		ret['content'] = re.sub(res[0], new, text)
	return json.dumps(ret)

if __name__ == "__main__":
	ret = process(sys.argv[1])	
	print(ret)

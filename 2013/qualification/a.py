import sys
import re

def check(s, i):
	if(areAllX(s)):
		print("Case #" + str(i + 1) + ": X won")
		sys.stdin.readline()
		return True
	if(areAllO(s)):
		print("Case #" + str(i + 1) + ": O won")
		sys.stdin.readline()
		return True
	return False

def areAllX(s):
	return re.match("(XXXX)|(XXXT)|(XXTX)|(XTXX)|(TXXX)",s) is not None
def areAllO(s):	
	return re.match("(OOOO)|(OOOT)|(OOTO)|(OTOO)|(TOOO)",s) is not None

t = int(sys.stdin.readline())

for i in range(t):
	line1 = sys.stdin.readline().strip('\n')
	line2 = sys.stdin.readline().strip('\n')
	line3 = sys.stdin.readline().strip('\n')
	line4 = sys.stdin.readline().strip('\n')
	lines = [line1, line2, line3, line4]
	anyEmpty = False
	# y
	done = False
	for j in range(4):
		if(line1[j] == '.' or line2[j] == '.' or line3[j] == '.' or line4[j] == '.'):
			anyEmpty = True 
		done = check(line1[j] + line2[j] + line3[j] + line4[j], i)
		if(done):
			break
	if(done):
		continue;
	# x
	for line in lines:
		done = check(line[0] + line[1] + line[2] + line[3], i)
		if(done):
			break;
	if(done):
		continue
	# d
	done = check(line1[0] + line2[1] + line3[2] + line4[3], i)
	if(done):
		continue
	done = check(line1[3] + line2[2] + line3[1] + line4[0], i)
	if(done):
		continue
	if(anyEmpty):
		print("Case #" + str(i + 1) + ": Game has not completed")
		sys.stdin.readline()
	else:
		print("Case #" + str(i + 1) + ": Draw")
		sys.stdin.readline()


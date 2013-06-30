import math
import sys

fairSquares = []

def howManyInRange(min, max):
	result = 0
	for i in fairSquares:
		if(min <= i and max >= i):
			result += 1
	return result

def isPalindrome(input):
	return input == input[::-1]

def getFairSquares(max):
	result = []
	sqrt = int(math.sqrt(max))
	for i in range(1, sqrt + 1):
		if(isPalindrome(str(i)) and isPalindrome(str(i*i))):
			result.append(i*i)
	return result


fairSquares = getFairSquares(10 ** 14)
# print(fairSquares)

t = int(sys.stdin.readline())
for i in range(t):
	line = sys.stdin.readline().strip('\n')
	(min, max) = line.split(" ")
	print("Case #" + str(i+1) + ": " + str(howManyInRange(int(min), int(max))))


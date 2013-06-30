import sys

t = int(sys.stdin.readline())
for i in range(t):
	line = sys.stdin.readline().strip('\n')
	(height, width) = line.split(" ")
	fields = []
	for j in range(int(height)):
		row = sys.stdin.readline().strip('\n')
		elementsInRow = row.split(" ")
		fields.append(elementsInRow)
	print(fields)
	fields.clear()


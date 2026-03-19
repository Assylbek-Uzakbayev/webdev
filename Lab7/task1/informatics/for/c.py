a = int(input())
b = int(input())
i = 1
while i*i <= b:
    if i*i >= a:
        print(i*i,end=" ")
    i += 1
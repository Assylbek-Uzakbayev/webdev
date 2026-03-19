def Xor(x, y):
    return (x and not y) or (not x and y)
x, y = map(int, input().split())
x = bool(x)
y = bool(y)

print(int(Xor(x, y)))
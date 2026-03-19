def split_and_join(line):
    words = line.split(" ")
    return "-".join(words)

if __name__ == '__main__':
    line = input().strip()
    result = split_and_join(line)
    print(result)
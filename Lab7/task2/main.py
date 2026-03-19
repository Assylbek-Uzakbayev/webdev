from models import Animal, Dog, Cat

def main():
    animals = [
        Animal("Generic", 5, "Unknown"),
        Dog("Rex", 3, "Husky"),
        Cat("Whiskers", 2, "Tabby")
    ]

    for animal in animals:
        print(animal)  
        print(animal.info())  
        print(f"{animal.name} says: {animal.speak()}") 

        if isinstance(animal, Dog):
            print(animal.fetch("ball"))
        elif isinstance(animal, Cat):
            print(animal.scratch())

        print("-" * 40)

if __name__ == "__main__":
    main()
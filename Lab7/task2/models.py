class Animal:
    def __init__(self, name, age, species):
        self.name = name
        self.age = age
        self.species = species

    def speak(self):
        return "Some animal sound"

    def info(self):
        return f"{self.name} is a {self.age}-year-old {self.species}"

    def __str__(self):
        return f"{self.name} ({self.species}, {self.age} years old)"


class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age, species="Dog")
        self.breed = breed

    def speak(self):  
        return "Woof!"

    def fetch(self, item):
        return f"{self.name} fetched the {item}!"

    def __str__(self):
        return f"{self.name} ({self.breed} Dog, {self.age} years old)"


class Cat(Animal):
    def __init__(self, name, age, color):
        super().__init__(name, age, species="Cat")
        self.color = color

    def speak(self):  
        return "Meow!"

    def scratch(self):
        return f"{self.name} is scratching the furniture!"

    def __str__(self):
        return f"{self.name} ({self.color} Cat, {self.age} years old)"
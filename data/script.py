from faker import Faker
import json

fake = Faker()
records = []

with open("output.jsonl", "w") as f:
    for _ in range(1000):
        line = {
            "sku": fake.ean(length=13),
            "vendor": {
                "name": fake.company(),
                "address": fake.address(),
                "email": fake.email(),
                "contacts": []
            },
            "category": fake.random_element(elements=("Tile", "Carpet", "Vinyl", "CounterTop", "Glass")),
            "price": fake.pricetag(),
            "width": fake.random_int(min=1, max=10),
            "length": fake.random_int(min=1, max=10),
            "description": fake.paragraph(nb_sentences=2, variable_nb_sentences=True, ext_word_list=None),
            "details": {}
        }

        for _ in range(fake.random_int(min=1, max=3)):
            line["vendor"]["contacts"].append({
                "name": fake.name(),
                "phone": fake.phone_number(),
                "email": fake.email()
            })

        if ["Tile", "Vinyl"].__contains__(line["category"]):
            line["depth"] = fake.random_int(min=1, max=10)
            line["details"]["color"] = fake.hex_color()

        if line["category"] == "Carpet":
            line["details"]["color"] = fake.hex_color()
            line["details"]["rollLength"] = fake.random_int(min=1, max=10)
            line["details"]["carpetType"] = fake.random_element(elements=("Glue Down", "Broadloom"))

        if line["category"] == "Stone":
            line["details"]["counterTopType"] = fake.random_element(elements=("Granite", "Marble", "Solid Surface", "Quartz", "Quartzite", "Dekton"))

        json.dump(line, f)
        f.write("\n")

print("Done!")
import argparse
import json
import re


def menu():
    parser = argparse.ArgumentParser(description='Change urls.')
    parser.add_argument('set', help='Usage: { serve | build } ')
    args = parser.parse_args()
    return args

def config_load():
    with open('config.json') as data_file:
        data = json.load(data_file)
    return data

def get_url_server():
    target = "http://localhost"
    port = config_load()['server']['port']
    url = f"{target}:{port}"
    return url

def get_url_build():
    url = config_load()['url']
    return url

def open_pug(file):
    with open(file, 'r') as f:
        text = f.readlines()
        return text[0]

def change_url(url):
    current_url = open_pug("lib/pug/url.pug")
    new_url = re.sub(r'-\s?var\s?url\s?=\s?\"[^\"]+\";', f'- var url = "{url}";', current_url)
    # Option: 2
    # new_url = re.sub(r'\"[a-z0-9:/]+\";', f'"{url}";', current_url)        
    f = open("lib/pug/url.pug", "w+")
    f.write(new_url)
    f.close()
    return new_url


if __name__ == "__main__":
    try:
        if menu().set == 'serve':
            change_url(get_url_server())
            # or
            # change_url(" ")
        elif menu().set == 'build':
            change_url(get_url_build())

    except Exception as err:
        print("An error has occurred!", err)


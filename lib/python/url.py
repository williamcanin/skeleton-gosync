import argparse
import json


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


if __name__ == "__main__":
    try:
        if menu().set == 'serve':
            print(get_url_server())
        elif menu().set == 'build':
            print(get_url_build())

    except Exception as err:
        print("An error has occurred!", err)

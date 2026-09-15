import urllib.request as request
import urllib.error as request_error
import json

from os import environ as env 
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

BEARER_TOKEN = env.get("BEARER_TOKEN")
BASE_API_URL = "http://localhost:4200/api"
HEADERS = {
	"Content-Type": "application/json",
	"Authorization": f"Bearer {BEARER_TOKEN}"
}

def make_post(url, data) -> request.Request:
	json_data = json.dumps(data).encode('utf-8')

	return request.Request(f"{BASE_API_URL}/{url}", data=json_data, headers=HEADERS, method="POST")

def make_get(url): 
	return request.Request(f"{BASE_API_URL}/{url}", headers=HEADERS, method="GET")

def main():
	try:
		url = "card"
		
		with request.urlopen(make_get(url)) as response:
			response_body = response.read()
			encoding = response.info().get_content_charset('utf-8')
			
			print("Статус код:", response.status)
			with open ("./bdata.json", "w", encoding="utf-8") as file:
				file.write(response_body.decode(encoding))
			# print("Ответ сервера:", response_body)

	except request_error.HTTPError as e:
		print(f"Ошибка HTTP: {e.code} {e.reason}")
		print(e.read().decode())

	except request_error.URLError as e:
		print(f"Ошибка URL: {e.reason}")

if __name__ == '__main__':
	main()
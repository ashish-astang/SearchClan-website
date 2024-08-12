from flask import *
import requests
import io
import json
import time
import os
import re
import openai
import pandas as pd
import hashlib

app = Flask(__name__)

openai.api_key = os.environ["open_ai_key_1"]

def parse_package_string(package_string):
    lines = package_string.split('\n')

    flights = []
    hotel = {}
    estimate_cost = {}

    current_flight = None

    for line in lines:
        if line.startswith('Flight'):
            current_flight = {}
            flights.append(current_flight)
        elif line.startswith('- Departure Airport'):
            current_flight['departure_airport'] = line.split(': ')[1]
        elif line.startswith('- Arrival Airport'):
            current_flight['arrival_airport'] = line.split(': ')[1]
        elif line.startswith('- Airline'):
            current_flight['airline'] = line.split(': ')[1]
        elif line.startswith('- Flight Number'):
            current_flight['flight_number'] = line.split(': ')[1]
        elif line.startswith('Hotel'):
            hotel['name'] = lines[lines.index(line) + 1].split(': ')[1]
            hotel['description'] = lines[lines.index(line) + 2].split(': ')[1]
        elif line.startswith('Estimate Cost'):
            estimate_cost['amount'] = str(line.split(' ')[2].replace(',', ''))
            estimate_cost['currency'] = line.split(' ')[3]

    package_json = {
        'flights': flights,
        'hotel': hotel,
        'estimate_cost': estimate_cost
    }

    return package_json

def get_flights(source, destination, date):
    access_key = '0ec367da1fb2897d377ee3057b944af1'
    start_date= date
    end_date= date
    url = f'http://api.aviationstack.com/v1/flights?access_key={access_key}&dep_iata={source}&arr_iata={destination}&flight_iata=&date_from={start_date}&date_to={end_date}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Request failed with status code: {response.status_code}")
        return "Error!"
    returned_flights=[]
    for i in range(0, 5):
        selected_flight=data['data'][i]
        flight_date=selected_flight['flight_date']
        departure_airport= selected_flight['departure']['airport']
        arrival_airport= selected_flight['arrival']['airport']
        airline= selected_flight['airline']['name']
        flight_number= selected_flight['flight']['iata']
        selected_fight_data= {'flight_date':flight_date,'departure_airport':departure_airport,'arrival_airport':arrival_airport,'airline':airline,'flight_number':flight_number}
        returned_flights.append(selected_fight_data)
    return returned_flights

def get_hotels(destination):
    api_key = "feb69280a932afe21beb5067f434ca4b"
    secret = "4f0bee06e9"
    timestamp = str(int(time.time()))
    signature_data = api_key + secret + timestamp
    x_signature = hashlib.sha256(signature_data.encode()).hexdigest()
    
    headers = {
        'Accept': 'application/json',
        'Api-key': api_key,
        'X-Signature': x_signature
    }

    url = 'https://api.test.hotelbeds.com/hotel-api/1.0/status'

    response = requests.get(url, headers=headers)

    language = 'en'
    headers = {'Api-key': 'feb69280a932afe21beb5067f434ca4b',
              'X-Signature': x_signature ,
              'Accept' : "application/json",
              "Accept-Encoding" : "gzip"}
    url = f'https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?destinationCode={destination}'


    response = requests.get(url,headers=headers)

    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Request failed with status code: {response.status_code}")
    response=[]
    for i in range(5):
        temp={}
        temp['name']=data['hotels'][i]['name']['content']
        temp['description']=data['hotels'][i]['description']['content']
        response.append(temp)
    return response
  
@app.route('/makepack',methods=['GET','POST'])
def get_packages():
    source=str(request.args.get('source'))
    no_of_people=int(request.args.get('no_of_people'))
    recommendations=str(request.args.get('recommend'))
    destination=str(request.args.get('destination'))
    date1=str(request.args.get('date1'))
    date2=str(request.args.get('date2'))
    event=int(request.args.get('event'))
    going_flights= get_flights(source, destination, date1)
    print(going_flights)
    coming_flights= get_flights(destination, source, date2)
    print(coming_flights)
    hotels= get_hotels(destination)
    print(hotels)
    prompt_medical=f"""
    The details for going flights are:
    {going_flights}
    
    The details for coming back flights are:
    {coming_flights}
    
    The hotel details are:
    {hotels}

    Number of people are:
    {no_of_people}

    Some THINGS TO KEEP IN MIND AND CHOOSE HOTEL AND FLIGHTS while making the package are:
    {recommendations}
    The details of flights and hotels are given to you in the form of a python list of dictionaries. 
    You are given 5 flights for going to the destination, 5 flights to come back and 5 hotels each. We have to derive a MEDICAL TREATMENT TRIP package using one of these flights and and one of these hotels for the difference between departure and arrival dates. 
    Now what I want you to do is create a packages and describe it in human text. 
    Use around 100 words to describe the package. 
    Describe everything about the package from which airline's flight the customer will be taking for travel to and from the destination.
    ALSO KEEP IN MIND THAT I ONLY WANT THE DESCRIPTIONS AND NO OTHER TEXT IN YOUR RESPONSE. 
    MAKE SURE YOU ELABORATE ON THE EXCLUSIVE MEDICAL FACILITIES THE DESTINATION HAS TO OFFER.
    DO NOT FORGET TO USE THE FLIGHT INFORMATION GIVEN TO YOU FOR BOTH GOING TO THE DESTINATION AND COMING BACK. PUT THAT IN THE PACKAGE DESCRIPTION ALSO
    USE A CATCHY TITLE FOR IT.
    Having made the package make a dictionary of the packages in python which follows a similar format but with different content:
    {{
    "content": 
    " 🏢 Business Adventure Package 🏢 Take a flight with IndiGo airlines on flight 6E2009 from Indira Gandhi International to Chhatrapati Shivaji International (Sahar International) airport in Mumbai. Stay at Fariyas Hotel, a luxurious city hotel situated in the heart of South Mumbai. The hotel is conveniently located close to shops, sea terminals, and the main train station. It offers elegant guest rooms, various dining options, and a relaxing ambiance. Explore the business opportunities in Mumbai, known as India's financial hub, and have productive meetings in the city's bustling corporate environment. Enjoy the culinary delights at the hotel's restaurants, offering Chinese, European, and Indian cuisines."
    }}
    PRINT ONLY THE PYTHON DICTIONARY OF THE PACKAGES WHILE CHANGING THE '🏢 Business Adventure Package 1 🏢' to A TITLE SUITING THE EVENT.
    """
    prompt_business=f"""
    The details for going flights are:
    {going_flights}
    
    The details for coming back flights are:
    {coming_flights}
    
    The hotel details are:
    {hotels}

    Number of people are:
    {no_of_people}

    Some THINGS TO KEEP IN MIND AND CHOOSE HOTEL AND FLIGHTS while making the package are:
    {recommendations}
    The details of flights and hotels are given to you in the form of a python list of dictionaries.
    You are given 5 flights for going to the destination, 5 flights to come back and 5 hotels each. We have to derive a BUSINESS TRIP package using one of these flights and and one of these hotels for difference between departure and arrival dates. 
    Now what I want you to do is create a package and describe them in human text. 
    Use around 100 words to describe EACH package. 
    Describe everything about the package from which airline's flight the customer will be taking for travel to and from the destination.
    ALSO KEEP IN MIND THAT I ONLY WANT THE DESCRIPTIONS AND NO OTHER TEXT IN YOUR RESPONSE. 
    MAKE SURE YOU ELABORATE ON HOW THE DESTINATION WOULD BE HELPFUL IN BUSINESS MEETINGS AND THE BUSINESS OPPORTUNITIES IT HAS TO OFFER.
    DO NOT FORGET TO USE THE FLIGHT INFORMATION GIVEN TO YOU FOR BOTH GOING TO THE DESTINATION AND COMING BACK. PUT THAT IN THE PACKAGE DESCRIPTION ALSO.

    USE A CATCHY TITLE FOR IT.
    Having made the package make a dictionary of the packages in python which follows a similar format but with different content:
    {{
    "content": 
    " 🏢 Business Adventure Package 1 🏢 Take a flight with IndiGo airlines on flight 6E2009 from Indira Gandhi International to Chhatrapati Shivaji International (Sahar International) airport in Mumbai. Stay at Fariyas Hotel, a luxurious city hotel situated in the heart of South Mumbai. The hotel is conveniently located close to shops, sea terminals, and the main train station. It offers elegant guest rooms, various dining options, and a relaxing ambiance. Explore the business opportunities in Mumbai, known as India's financial hub, and have productive meetings in the city's bustling corporate environment. Enjoy the culinary delights at the hotel's restaurants, offering Chinese, European, and Indian cuisines."
    }}
    PRINT ONLY THE PYTHON DICTIONARY OF THE PACKAGES WHILE CHANGING THE '🏢 Business Adventure Package 1 🏢' to A TITLE SUITING THE EVENT.
    """
    prompt_vacation=f"""
    The details for going flights are:
    {going_flights}
    
    The details for coming back flights are:
    {coming_flights}
    
    The hotel details are:
    {hotels}

    Number of people are:
    {no_of_people}

    Some THINGS TO KEEP IN MIND AND CHOOSE HOTEL AND FLIGHTS while making the package are:
    {recommendations}
    The details of the flights and the hotels are given to you in the form of a python list of dictionaries. 
    You are given 5 flights for going to the destination, 5 flights to come back and 5 hotels each. We have to derive a destination holiday vacation package using one of these flights and and one of these hotels for difference between departure and arrival dates. 
    Now what I want you to do is create a package and describe them in human text. 
    Use around 100 words to describe the package. 
    Describe everything about the package from which airline's flight the customer will be taking for travel to and from the destination.
    ALSO KEEP IN MIND THAT I ONLY WANT THE DESCRIPTIONS AND NO OTHER TEXT IN YOUR RESPONSE. 
    MAKE SURE YOU ELABORATE ON THE EXCLUSIVE TOURISM SPOTS AND FACILITIES THE CITY HAS TO OFFER.
    DO NOT FORGET TO USE THE FLIGHT INFORMATION GIVEN TO YOU FOR BOTH GOING TO THE DESTINATION AND COMING BACK. PUT THAT IN THE PACKAGE DESCRIPTION ALSO.
    USE EMOJIS EXTENSIVELY IN THE HEADING AND DESCRIPTION ALSO
    Having made the package make a dictionary of the packages in python which follows a similar format but with different content:
    {{
    "content": 
    " 🏢 Business Adventure Package 1 🏢 Take a flight with IndiGo airlines on flight 6E2009 from Indira Gandhi International to Chhatrapati Shivaji International (Sahar International) airport in Mumbai. Stay at Fariyas Hotel, a luxurious city hotel situated in the heart of South Mumbai. The hotel is conveniently located close to shops, sea terminals, and the main train station. It offers elegant guest rooms, various dining options, and a relaxing ambiance. Explore the business opportunities in Mumbai, known as India's financial hub, and have productive meetings in the city's bustling corporate environment. Enjoy the culinary delights at the hotel's restaurants, offering Chinese, European, and Indian cuisines."
    }}
    PRINT ONLY THE PYTHON DICTIONARY OF THE PACKAGES WHILE CHANGING THE '🏢 Business Adventure Package 1 🏢' to A TITLE SUITING THE EVENT.
    """
    prompt_weddings=f"""
    The details for going flights are:
    {going_flights}
    
    The details for coming back flights are:
    {coming_flights}
    
    The hotel details are:
    {hotels}

    Number of people are:
    {no_of_people}

    Some THINGS TO KEEP IN MIND AND CHOOSE HOTEL AND FLIGHTS while making the package are:
    {recommendations}
    The details of the hotels and the flights are given to you in the form of a python list of dictionaries. 
    You are given 5 flights for going to the destination, 5 flights to come back and 5 hotels each. We have to derive a destination wedding package using one of these flights and and one of these hotels for difference between departure and arrival dates. 
    Now what I want you to do is create a package and describe them in human text. 
    Use around 100 words to describe the package. 
    Describe everything about the package from which airline's flight the customer will be taking for travel to and from the destination.
    ALSO KEEP IN MIND THAT I ONLY WANT THE DESCRIPTIONS AND NO OTHER TEXT IN YOUR RESPONSE. 
    MAKE SURE YOU ELABORATE ON THE EXCLUSIVE WEDDING FACILITIES THE CITY HAS TO OFFER.
    DO NOT FORGET TO USE THE FLIGHT INFORMATION GIVEN TO YOU FOR BOTH GOING TO THE DESTINATION AND COMING BACK. PUT THAT IN THE PACKAGE DESCRIPTION ALSO.
    USE EMOJIS EXTENSIVELY IN THE HEADING AND DESCRIPTION ALSO

    USE A CATCHY TITLE FOR IT.
    Having made the package make a dictionary of the packages in python which follows a similar format but with different content:
    {{
    "content": 
    " 🏢 Business Adventure Package 1 🏢 Take a flight with IndiGo airlines on flight 6E2009 from Indira Gandhi International to Chhatrapati Shivaji International (Sahar International) airport in Mumbai. Stay at Fariyas Hotel, a luxurious city hotel situated in the heart of South Mumbai. The hotel is conveniently located close to shops, sea terminals, and the main train station. It offers elegant guest rooms, various dining options, and a relaxing ambiance. Explore the business opportunities in Mumbai, known as India's financial hub, and have productive meetings in the city's bustling corporate environment. Enjoy the culinary delights at the hotel's restaurants, offering Chinese, European, and Indian cuisines."
    }}
    PRINT ONLY THE PYTHON DICTIONARY OF THE PACKAGES WHILE CHANGING THE '🏢 Business Adventure Package 1 🏢' to A TITLE SUITING THE EVENT.
    """

    if event==0:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"{prompt_weddings}"}
            ]
        )
    elif event==1:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"{prompt_vacation}"}
            ]
        )
    elif event==2:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"{prompt_business}"}
            ]
        )
    else:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"{prompt_medical}"}
            ]
        )
    speech=response.choices[0].message['content']
    print(speech)
    #tt=extract_paragraphs_as_json(speech)
    #print(tt)
    return jsonify(json.loads(speech))
    
@app.route('/packdetail',methods=['GET','POST'])    
def get_package_details():
    package=str(request.args.get('package'))
    prompt_package_details= f"""
        The description of the package is:
        {package}

        I want you to use this description and generate package details in the format given below:
        
        
            <Package Title>
            
            Flight 1:
            - Departure Ariport: ........
            - Arrival Airport: ........ 
            - Airline: ........
            - FLight Number: ........

            Flight 2:
            - Departure Ariport: ........
            - Arrival Airport: ........
            - Airline: ........
            - Flight Number: ........


            Hotel:
            - Name:........
            - Description:........
            
            Exclusive Details:
            
            <put random facts about the destination related to the package. You can pick it up from the description given above>
            
            Estimate Cost: <put rounded off number that estimates the total cost of package between 2000 and 2000000> INR


           
        
        Replace the dots with the information you can retreive from the description given. 
        MAKE SURE ALL THE FIELDS ARE FILLED.
        TRY TO GUESS THE ESTIMATE COST BASED ON THE HOTEL FLIGHTS AND OTHER AMENITIES AND KEEP IT BASED ON HISTORIC DATA NOT JUST ANY RANDOM NUMBER.
        DO NOT USE RUPEES SYMBOL OR ANY SYMBOL WITH NUMBERS WHEN SHOWING ESTIMATE COST.
        ALSO KEEP IN MIND THAT I ONLY WANT THE PACKAGE DETAILS AND NO OTHER TEXT IN YOUR RESPONSE. 
        ONLY GIVE ME TEXT REPSPONSE.
        IT IS ALSO MANDATORY FOR YOU TO REPLACE ALL DOTS. DO NOT LEAVE ANY IN THE RESPONSE YOU GIVE. IF ANY SUCH DETAIL IS NOT GIVEN IN THE DESCRIPTION, MAKE IT UP YOURSELF.
        DO NOT PUT ANYTHING IN CURLY BRACKETS IN THE OUTPUT YOU GIVE. I WANT COMPLETE ANSWER!
        EXTENSIVELY USE EMOJIS IN THE OUTPUT TO MAKE IT LOOK BETTER!
        DO NOT FORGET TO USE EMOJIS!
    """
    json_output={
        'flights': {},
        'hotel': {},
        'estimate_cost': {}
    }
    count=2
    while any(not (isinstance(value, dict) and value) for value in json_output.values()) and count>0:
        time.sleep(15)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"{prompt_package_details}"}
            ]
        )
        pack=response.choices[0].message['content']
        print(pack)
        json_output = parse_package_string(pack)
        count=count-1
    return jsonify(json_output)

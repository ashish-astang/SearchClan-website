
# SearchClan- Humanizing Travel Search

## Description
This web service automates the creation of travel packages, including flight and hotel bookings, by leveraging the capabilities of OpenAI's APIs. Utilizing input parameters such as source, destination, number of people, and travel dates, the service generates a detailed itinerary, including estimated costs and exclusive details for accommodations and flights.

## Environment Setup on Render
To set up your environment on Render, you need to configure the following environment variable:
- `OPEN_AI_KEY_1`: Set this to your OpenAI API key to enable the service to communicate with OpenAI's APIs.

## Build Command for Render
Install all the necessary dependencies by running:
```
pip install -r requirements.txt
```

## Start Command
To start the web service on Render, use the following command:
```
gunicorn app:app --timeout 100
```

## How It Works
1. **Input**: The user provides the source and destination codes, the number of people traveling, check-in and check-out dates, and any specific event or recommendation preferences.
2. **Processing**: Using the OpenAI API, the service fetches the relevant flight and hotel options, creating a custom travel package based on the given input.
3. **Output**: The result is a comprehensive travel package that includes all the details required for a seamless and enjoyable trip.

## Installation
Ensure you have `gunicorn` and other required packages installed by running the build command specified above. For local development, you can use virtual environments to manage your packages.

## Usage
Once installed, start the service with the start command. The web service will listen for incoming requests and process them as per the architecture defined.

## Contributing
Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE file for details.

## Tech Stack
-HTML
-CSS
-Javascript
-ReactJS
-Express
-3.js
-Python
-OpenAI
-Flask
-Azure

## Link to Website
https://searchclan.vercel.app/home

### Creators

<b>SearchClan</b> project was created by:

- [Abhishek Rao Komarraju](https://github.com/AbhishekkRao)
- [Aibhinav Upadhyay](https://github.com/Abhixsmasher)
- [Mahika Kushwaha](https://github.com/xx-Mahika-xx)
- [Shivang Patel](https://github.com/Shivang-Patel)
- [Vasu Pal](https://github.com/Vasu1712)

## Video

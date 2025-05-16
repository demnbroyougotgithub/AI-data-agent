# AI-data-agent
This agent can easily answer complex business questions based on the database provides. The it uses Gemini AI for converting the questions from natural language into a sql query and then provide answer's with the help of chart's.

I am using docker to run the agent on my laptop but you can use the original setup for everything.

You can change the DATABASE if you want, it is present in Data/sample_data.sql file.

You need to create an Gemini API key to use the Gemini AI for NPL.
You need to follow the steps:

1. Go to Google AI Studio:
Visit: https://aistudio.google.com/
Sign in with your Google Account.

3. Create a New API Key:
On the left sidebar, click on "API Keys".
Click the “+ Create API Key” button.

3. Select the Model:
Choose a Gemini model, like Gemini 1.5 Pro.
(Optional) Configure project name, region, or other settings.

5. Copy the API Key:
Once generated, copy the key and store it securely.
This key will be used to authenticate your API requests.

Paste the API key in .env file.

You also need to create a service account so that the Gemini agent can authenticate with the Google Generative Language API.
After creating service account generate JSON key and add the JSON file into Backend/keys folder as service-account.json.

After everything is done run docker-compose up --build command.
It will take some time and then the frontend will run on http://localhost:3000

Following are some of the questions that the agent is able to answer efficiently:
1. List all customers who placed more than 5 orders.
2. How many orders were placed each month?
3. Show the top 5 customers by total order amount.
4. List customers with no orders.
5. Get total orders placed in 2023.


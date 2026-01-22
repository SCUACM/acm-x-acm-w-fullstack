# Intro to Backend: API's + Flask
In this part of the workshop, set up your own Flask server and integrate it with your React front end from the previous workshop.

## Simple API call example
simple.py contains a very basic GET request with a fake API (https://jsonplaceholder.typicode.com/). This is not a part of the project, but for you to understand a simple example where the client is our Python code requesting data from a resource.

## Flask Demo Setup
Make sure to have Python installed (https://www.python.org/downloads/). You can verify you have it installed by checking your versions of Python and pip.

On Linux and macOS
```
python3 --version
pip3 --version
```
On Windows
```
python --version
pip --version
```

We are continuing from where we left off with our React frontend (but you don't necessarily need it to implement your backend. First begin by creating a folder for your front end and backend. Move into your backend directory. You should have the following file structure:

```
cd backend
```
Now time to create a virtual environment. Why do we need one? Short answer: it's cleaner. It helps to create isolated, project-specific sandboxes, preventing package version conflicts and protecting your system's global Python installation.

On Linux and macOS
```
python3 -m venv .venv
```
On Windows
```
python -m venv .venv
```
To activate it
```
source .venv/bin/activate
```
When you activate it you should see (venv
To deactivate it
```
deactivate
```

Great now you should see (.venv) in front of your terminal prompt.

Create another folder called src in your backend folder (NOT in your .venv folder). Create a file called app.py in this folder. You should have the following file structure.

```
.
├── frontend
    ├── crud_app            # name of my React Project
      └── ...
├── backend                    
│   ├── .venv               # contains virtual environment
│   ├── src         
│     └── app.py                

```
Now that your venv is activated, you'll want to install Flask.

On Linux and macOS
```
pip3 install flask
```
On Windows 
```
pip install flask
```

## Writing the CRUD app with Flask
Congrats your setup is complete! Now time to write our Flask backend! Our backend will serve our client, our React front end. We will write our own API, define our own endpoints, and controll our own data. Let's familiarize ourselves with the different HTTP Methods to help us Create, Read, Update, and Delete (POST, GET, PUT, DELETE). 

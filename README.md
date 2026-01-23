# Backend: Introduction to Firebase and Putting it All Together

Learning how to use the Google's FireStore database to store infromation sent from your frontend through API calls.

- [Frontend: React Front End Development](https://github.com/SCUACM/acm-x-acm-w-fullstack/tree/1-20-react)
- [Backend: Intro to Flask & APIS](https://github.com/SCUACM/acm-x-acm-w-fullstack/tree/1-21-api)
- [Backend: Intro to Firebase](https://github.com/SCUACM/acm-x-acm-w-fullstack/tree/1-22-db)

## Prerequisites
1. Download this project as zip by clicking on the green `code` button and selecting `Download ZIP`
   1. If you're comfortable with Github, simply clone the repo and switch branches to this one
2. Select a folder that's comfortable for you, then unpack the zip to get the contents in the folder
3. Open this folder in VSCode, you should see the `backend` and `clicker` folders
4. Open the terminal in VSCode (`CTRL + ~`)
5. Install the npm packages for the frontend
   1. `cd clicker`
   2. `npm install`
   3. `npm run dev` to confirm the frontend is loading
6. Install the pip packages for the backend
   1. `cd ../backend`
   2. Create virtual env
      1. MacOS/Linux: `python3 -m venv venv`
      2. Windows: `py -m venv venv`
   3. Select the virtual environment
      1. MacOS/Linux: `source venv/bin/activate`
      2. Windows: `.\venv\Scripts\activate`
      3. It's correct when you see `(venv)` at the start of every termainal command
   4. `pip install -r requirements.txt`
   5. `python app.py` to confirm the backend is loading
---

## Getting Started With FireBase

### Create a Project
- Sign in to your *personal gmail* (Do NOT use your SCU account, yet)
- Navigate to the FireBase [console](https://console.firebase.google.com)
- Create a new FireBase project
    - Name your project
    - You will be promped to opt-in or opt-out of:
        - Google Developer Program
        - Enabling Gemini in FireBase
        - Enabling Google Analytics
    - These are *optional* and you will be able to run your code no matter what you choose
- *If you want to include your SCU email account in your project*
    - Gear Icon -> Users And Permissions -> Add Member -> <youremail> -> Owner -> Add Member

---
### Connect Your Project to Your Code
- Gear Icon -> Service Accounts -> Admin SDK Configuration Snippet -> Python
- Copy this into your app.py file

- OR copy here:
```py
import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
```
- You can update the import line to include FireStore as so:
```py
import firebase_admin
from firebase_admin import credentials, firestore
```

### Create Your Servive Account Key (*SENSITIVE INFORMATION*)
- Generate New Private Key
    - Click on the 'file' icon in your downloads to find its location
    - Drag the newly downloaded file into your project folder

- **Put your filename into a .gitignore**
    - If you do not have one already, create a .gitignore file
    - Take the name of your Service Account Key file and copy it into your .gitignore file
    - OR - Rename your Service Account Key file to credentials.json IF you are using our provided code
    - More information about [.gitignore](https://www.w3schools.com/git/git_ignore.asp)

---
### Create Your FireStore Database
- Navigate back to your FireBase project
- Navigate to 'FireStore Database'
- Create a database
    - When you are prompted, choose:
        - Edition: Standard Edition
        - Location: nam5 (United States)
        - Mode: Test Mode

- Create your first collection!
    - Name your collection 'clicker'
    - Create your document 'counter'
        - Usually, you would generate a random ID, but for the purposes of this workshop we will name it this
    - Create your first field 'current_value' as a number
    - Create your second field 'history' as an array
        - Delete the first field of the array so that it becomes empty

---
### Begin coding
- First, we are going to work in our app.py file to implement the following functions
1. Initialize the database 
```py
firebase_admin.initialize_app(cred)
db = firestore.client()
```

2. Add a GET method for our history
```py
@app.route("/firebase/get" , methods=["GET"])
def firebase_get():
    db = firestore.client()
    doc = db.collection("clicker").document("counter").get()
    if doc.exists:
        return jsonify(doc.to_dict())
    return jsonify({"error": "Document not found"}), 404
```

3. Add a POST method for our history
```py
@app.route("/firebase/set", methods=["POST"])
def firebase_set():
    data = request.get_json()
    print("Received data for Firebase update:", data)
    db.collection("clicker").document("counter").set(data)
    return jsonify({"message": "Data updated successfully"}), 200
```
4. Last, make sure you have the closing statement for flask app to run
```py
if __name__ == "__main__":
    app.run(port=8080,debug=True)
```

- Second, we are going to work in the counter.jsx file to tie these functions into our frontend
1. Update the Increment Function
Our orignal function
```jsx
  const increment = () => {
    const next = count + 1;
    setCount(next);
    setHistory([...history, next]);
  };
```
will become
```jsx
const increment = () => {
    const next = count + 1;
    setCount(next);
    setHistory([...history, next]);
    fetch("http://127.0.0.1:8080/firebase/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_value: next, history: [...history, next] }),
    }).catch((err) => console.error("Failed to update firebase data:", err));
  };
```

2. Update the Decrement Function
Our original function
```jsx
    const decrement = () => {
    const next = count - 1;
    setCount(next);
    setHistory([...history, next]);
  };
```
will become 
```jsx
const decrement = () => {
    const next = count - 1;
    setCount(next);
    setHistory([...history, next]);
    fetch("http://127.0.0.1:8080/firebase/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_value: next, history: [...history, next] }),
    }).catch((err) => console.error("Failed to update firebase data:", err));
  };
```

3. Last, we will tie the 'users' GET and POST functions we initialized in our last workshop to our frontend
```jsx
const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/users") // your Flask API
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Failed to fetch users:", err));

    fetch("http://127.0.0.1:8080/firebase/get")
      .then((res) => res.json())
      .then((data) => {
        console.log("Firebase data received:", data);
        if (data.current_value !== undefined && data.history !== undefined) {
          setCount(data.current_value);
          setHistory(data.history);
        }
      })
      .catch((err) => console.error("Failed to fetch firebase data:", err));
  }, []);
```
---
And that's all we have for our workshop! Now, you should have a fully functional frontend, API calls, and backend, and most importantly, we were able to put them all together!

Make sure to come to our next workshop, Self Hosting, where you will learn to host your app on ACM's Raspberry Pi's!!

Happy Coding!
ACM & ACM-W
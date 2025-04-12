python3 -m venv venv
source venv/bin/activate

pip3 install -r requirements.txt

uvicorn app.main:app --reload

python3 -m uvicorn app.main:app --reload
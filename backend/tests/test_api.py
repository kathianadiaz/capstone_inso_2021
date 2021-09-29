from tests import client

def test_hello_world():
    assert "Hello World" == "Hello World"

def test_root():
    response = client.get('/')
    assert response.status_code == 200
    assert response.json() == {'message': 'Hello World'}
from tests import client

def test_root():
    response = client.get('/')
    assert response.status_code == 200
    assert response.json() == {'message': 'Hello World'}

def test_register():
    response = client.post(
        '/register',
        json={'name':'tester', 'email':'testing@test.com', 'username':'tester', 'password':'testing' },
    )

    data = response.json()
    assert response.status_code == 200, response.text
    assert 'u_id' in data
    assert data['name'] == 'tester'
    assert data['email'] == 'testing@test.com'
    assert data['username'] == 'tester'

def test_duplicate_register():
    response = client.post(
        '/register',
        json={'name':'tester', 'email':'testing@test.com', 'username':'tester', 'password':'testing' },
    )

    assert response.status_code == 400, response.text
    assert response.json() == {"detail": "Email or username already registered"}

def test_get_user_by_id():
    response = client.post(
        '/register',
        json={'name':'tester1', 'email':'testing1@test.com', 'username':'tester1', 'password':'testing' },
    )

    u_id = response.json()['u_id']

    response = client.get(
        f'/user/{u_id}'
    )

    data = response.json()
    assert response.status_code == 200, response.text
    assert data['name'] == 'tester1'
    assert data['email'] == 'testing1@test.com'
    assert data['username'] == 'tester1'

def test_login():
    response = client.post(
        '/token',
        data={'username':'tester', 'password':'testing'}
    )

    assert response.status_code == 200, response.text

    response = client.post(
        '/token',
        data={'username':'tester', 'password':'wrong password'}
    )

    assert response.status_code == 401, response.text
    assert response.json() == {"detail": "Incorrect username or password"}

def test_create_organizations():
    response = client.post(
        '/organization',
        json={'name':'testers', 'description':'testing org', 'tags':['software','testing'], 'department':'INSO', 'status': False}
    )

    organization = response.json()
    assert response.status_code == 200
    assert 'o_id' in organization
    assert organization['name'] == 'testers'
    assert organization['description'] == 'testing org'
    assert organization['tags'] == ['software', 'testing']
    assert organization['department'] == 'INSO'
    assert organization['status'] == False

    response = client.post(
        '/organization',
        json={'name':'testers2', 'description':'testing org2', 'tags':['software','testing'], 'department': 'INSO'}
    )

    organization = response.json()
    print(response.json())
    assert response.status_code == 200
    assert 'o_id' in organization
    assert organization['name'] == 'testers2'
    assert organization['description'] == 'testing org2'
    assert organization['tags'] == ['software', 'testing']
    assert organization['department'] == 'INSO'
    assert organization['status'] == False

def test_get_all_organizations():
    response = client.get('/organization')

    organizations = response.json()

    assert response.status_code == 200
    assert len(organizations) == 2
    assert organizations[0]['name'] == 'testers'
    assert organizations[1]['name'] == 'testers2'

def test_get_organization_by_id():
    response = client.post(
        '/organization',
        json={'name':'testers3', 'description':'testing org3', 'tags':['software','testing'], 'department': 'INSO'}
    )

    o_id = response.json()['o_id']

    response = client.get(f'/organization/{o_id}') 

    organization = response.json()
    assert response.status_code == 200
    assert organization['name'] == 'testers3'
    assert organization['description'] == 'testing org3'
    assert organization['tags'] == ['software', 'testing']
    assert organization['department'] == 'INSO'
    assert organization['status'] == False
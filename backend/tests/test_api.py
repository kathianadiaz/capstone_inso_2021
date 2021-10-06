from tests import client
from uuid import uuid4

from organization.repository import OrganizationRepository, OrganizationHighlight

TOKEN = ''

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
    global TOKEN

    response = client.post(
        '/token',
        data={'username':'tester', 'password':'testing'}
    )

    assert response.status_code == 200, response.text

    TOKEN = response.json()['access_token']

    response = client.post(
        '/token',
        data={'username':'tester', 'password':'wrong password'}
    )

    assert response.status_code == 401, response.text
    assert response.json() == {"detail": "Incorrect username or password"}

def test_create_organizations():
    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKEN}"},
        json={'name':'testers', 'description':'testing org', 'tags':['software','testing'], 'department':'INSO', 'status': False, 'highlights':[]}
    )

    organization = response.json()
    assert response.status_code == 200
    assert 'o_id' in organization
    assert organization['name'] == 'testers'
    assert organization['description'] == 'testing org'
    assert organization['tags'] == ['software', 'testing']
    assert organization['department'] == 'INSO'
    assert organization['status'] == False
    assert organization['highlights'] == []

    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKEN}"},
        json={'name':'testers2', 'description':'testing org2', 'tags':['software','testing'], 'department': 'INSO','highlights':[]}
    )

    organization = response.json()
    assert response.status_code == 200
    assert 'o_id' in organization
    assert organization['name'] == 'testers2'
    assert organization['description'] == 'testing org2'
    assert organization['tags'] == ['software', 'testing']
    assert organization['department'] == 'INSO'
    assert organization['status'] == False
    assert organization['highlights'] == []

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
        headers= {"Authorization" : f"Bearer {TOKEN}"},
        json={'name':'testers3', 'description':'testing org3', 'tags':['software','testing'], 'department': 'INSO', 'highlights':[{'title':'test','description':'test'}]}
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
    assert organization['highlights'] == [
      { 'oh_id': organization['highlights'][0]['oh_id'],
        'date': organization['highlights'][0]['date'],
        'title': 'test',
        'description':'test',
        'attachment': None
      } 
    ]

def test_get_administrators_organizations():
    response = client.get(
        '/my-organizations',
        headers= {"Authorization" : f"Bearer {TOKEN}"}
    )

    organizations = response.json()
    assert response.status_code == 200
    assert len(organizations) == 3
    assert organizations[0]['name'] == 'testers'
    assert organizations[1]['name'] == 'testers2'
    assert organizations[2]['name'] == 'testers3'

def test_delete_organization():
    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKEN}"},
        json={'name':'testers4', 'description':'testing org4', 'tags':['software','testing'], 'department': 'INSO'}
    )

    assert response.status_code == 200
    o_id = response.json()['o_id']

    response = client.get(
        '/my-organizations',
        headers= {"Authorization" : f"Bearer {TOKEN}"}
    )

    assert response.status_code == 200
    assert len(response.json()) == 4

    client.delete(
        f'/organization/{o_id}',
        headers= {"Authorization" : f"Bearer {TOKEN}"}
    )

    response = client.get(
        '/my-organizations',
        headers= {"Authorization" : f"Bearer {TOKEN}"}
    )
    response.status_code == 200
    assert len(response.json()) == 3


def test_add_hightlight():
    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKEN}"},
        json={'name':'testers4', 'description':'testing org4', 'tags':['software','testing'], 'department': 'INSO','highlights':[]}
    )

    assert response.status_code == 200
    assert len(response.json()['highlights']) == 0

    o_id = response.json()['o_id']

    response = client.post(
        f'/organization/{o_id}/highlight',
        # headers= {"Authorization" : f"Bearer {TOKEN}"},
        json= {'title':'test','description':'test'}
    )

    organization = response.json()
    assert response.status_code == 200
    assert organization['name'] == 'testers4'
    assert organization['highlights'] == [
      { 'oh_id': organization['highlights'][0]['oh_id'],
        'date': organization['highlights'][0]['date'],
        'title': 'test',
        'description':'test',
        'attachment': None
      } 
    ]


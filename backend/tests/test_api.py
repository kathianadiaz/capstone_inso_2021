from tests import client
from uuid import uuid4
from typing import List

from organization.repository import OrganizationRepository, OrganizationHighlight

TOKENS = []

# TODO: refactor code. Lots of repeated lines that can be put into a function

def create_testing_organization(name: str, description: str = 'testing org', tags: List[str] = [], department:str = 'INSO'):
    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={'name':name, 'description': description, 'tags': tags, 'department': department}
    )

    assert response.status_code == 200

    return response.json()

def test_register():
    response = client.post(
        '/register',
        json={'name':'tester', 'email':'testing@test.com', 'username':'tester', 'password':'testing' },
    )

    client.post(
        '/register',
        json={'name':'tester2', 'email':'testing@test2.com', 'username':'tester2', 'password':'testing' },
    )
    assert response.status_code == 200

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
    # global TOKEN
    global TOKENS

    response = client.post(
        '/token',
        data={'username':'tester', 'password':'testing'}
    )

    assert response.status_code == 200, response.text
    assert "user" in response.json()

    # TOKEN = response.json()['access_token']
    TOKENS.append(response.json()['access_token'])

    response = client.post(
        '/token',
        data={'username':'tester2', 'password':'testing'}
    )   
    assert response.status_code == 200, response.text

    TOKENS.append(response.json()['access_token'])

    response = client.post(
        '/token',
        data={'username':'tester', 'password':'wrong password'}
    )

    assert response.status_code == 401, response.text
    assert response.json() == {"detail": "Incorrect username or password"}

def test_create_organizations():
    organization = create_testing_organization(name='testers', tags=['software', 'testing'])

    assert 'o_id' in organization
    assert organization['name'] == 'testers'
    assert organization['email'] == 'test@gmail.com'
    assert organization['description'] == 'testing org'
    assert organization['tags'] == ['software', 'testing']
    assert organization['department'] == 'INSO'
    assert organization['status'] == False
    assert organization['highlights'] == []

    organization = create_testing_organization(name='testers2',description='testing org2', tags=['software', 'testing'])

    assert 'o_id' in organization
    assert organization['name'] == 'testers2'
    assert organization['email'] == 'test2@gmail.com'
    assert organization['description'] == 'testing org2'
    assert organization['tags'] == ['software', 'testing']
    assert organization['department'] == 'INSO'
    assert organization['status'] == False
    assert organization['highlights'] == []
    assert organization['members'] == []

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
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={'name':'testers3', 'email':'test3@gmail.com', 'description':'testing org3', 'tags':['software','testing'], 'department': 'INSO', 'highlights':[{'title':'test','description':'test'}]}
    )

    o_id = response.json()['o_id']

    response = client.get(f'/organization/{o_id}') 

    organization = response.json()
    assert response.status_code == 200
    assert organization['name'] == 'testers3'
    assert organization['email'] == 'test3@gmail.com'
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
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"}
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
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={'name':'testers4', 'email':'test4@gmail.com','description':'testing org4', 'tags':['software','testing'], 'department': 'INSO'}
    )

    assert response.status_code == 200
    o_id = response.json()['o_id']

    response = client.get(
        '/my-organizations',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"}
    )

    assert response.status_code == 200
    assert len(response.json()) == 4

    client.delete(
        f'/organization/{o_id}',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"}
    )

    response = client.get(
        '/my-organizations',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"}
    )
    response.status_code == 200
    assert len(response.json()) == 3

def test_edit_organization():
    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={'name':'testers4', 'email':'test4@gmail.com', 'description':'testing org4', 'tags':['software','testing'], 'department': 'INSO'}
    )

    assert response.status_code == 200
    o_id = response.json()['o_id']

    response = client.put(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={'o_id':o_id,'name':'test_edit', 'email':'test4edit@gmail.com' , 'description':'testing org4', 'tags':['software','testing'], 'department': 'INSO'}
    ) 


    assert response.status_code == 200
    organization = response.json()
    assert organization['name'] == 'test_edit'


def test_add_hightlight():
    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={'name':'testers4','email':'test4@gmail.com' , 'description':'testing org4', 'tags':['software','testing'], 'department': 'INSO','highlights':[]}
    )

    assert response.status_code == 200
    assert len(response.json()['highlights']) == 0

    o_id = response.json()['o_id']

    response = client.post(
        f'/organization/{o_id}/highlight',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
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

def test_delete_highlight():
    response = client.post(
        '/organization',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={'name':'testers5', 'email':'test5@gmail.com','description':'testing org4', 'tags':['software','testing'], 'department': 'INSO','highlights':[]}
    )

    assert response.status_code == 200
    assert len(response.json()['highlights']) == 0

    o_id = response.json()['o_id']

    response = client.post(
        f'/organization/{o_id}/highlight',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json= {'title':'test','description':'test'}
    )

    assert response.status_code == 200
    assert len(response.json()['highlights']) == 1

    oh_id = response.json()['highlights'][0]['oh_id']

    response = client.delete(
        f'/organization/{o_id}/highlight/{oh_id}',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
    )

    assert response.status_code == 200
    assert len(response.json()['highlights']) == 0

def test_add_member_information():
    organization = create_testing_organization('org')

    response = client.post(
        f'/organization/{organization["o_id"]}/member-information',
        json={
            "name": "string",
            "email": "string",
            "links": [
                "string"
            ],
            "resume": "string",
            "picture": "string"
        }
    )

    assert response.status_code == 200

    response = client.get(f'/organization/{organization["o_id"]}') 

    assert response.status_code == 200
    assert len(response.json()['members']) == 1

def test_add_member_info_as_user():
    response = client.post(
        f'/user/member-information',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
        json={
            "name": "string",
            "email": "string2",
            "links": [
                "string"
            ],
            "resume": "string",
            "picture": "string"
        }
    )

    assert response.status_code == 200
    assert response.json()['m_id'] != None 

    

def test_connect_member_to_organization():
    response = client.post(
        f'/user/member-information',
        headers= {"Authorization" : f"Bearer {TOKENS[1]}"},
        json={
            "name": "string",
            "email": "string2",
            "links": [
                "string"
            ],
            "resume": "string",
            "picture": "string"
        }
    )

    assert response.status_code == 200
    assert response.json()['m_id'] != None 
    m_id = response.json()['m_id']

    org = create_testing_organization("org2")

    response = client.post(
        f'/organization/{org["o_id"]}/member-information/{m_id}',
        headers= {"Authorization" : f"Bearer {TOKENS[0]}"},
    )

    assert response.status_code == 200
    assert len(response.json()['members']) > 0

def test_get_organizations_by_member():
    response = client.get(
        '/my-organizations-member',
        headers= {"Authorization" : f"Bearer {TOKENS[1]}"}
    )

    assert response.status_code == 200
    assert len(response.json()) == 1



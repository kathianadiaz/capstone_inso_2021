import time
import random 
import uuid
from locust import HttpUser, task, between, FastHttpUser
from locust.exception import RescheduleTask

#NOTE: Only run with testing db

# class QuickstartUser(HttpUser):
class QuickstartUser(FastHttpUser):
    wait_time = between(2, 10)
    organizations = []

    @task()
    def get_organizations(self):
        with self.client.get("/organiation",catch_response=True) as response:
            if response.status_code != 200:
                raise RescheduleTask()

    @task()
    def add_getByID_edit_delete_organization(self):
        o_id = None   

        with self.client.post("/organization", 
            json={"name": "test","description": "tests","tags": ["s","tag"],"department": "INSO","status": False,"highlights": []},
            headers=self.headers,
            catch_response=True) as response:
            
            if response.status_code != 200:
                response.failure("error creating organization")
                raise RescheduleTask()

            self.organizations.append(response.json()['o_id'])

            o_id = response.json()['o_id']

        time.sleep(2)
        with self.client.get(f'/organization/{o_id}',name='/organization/{id}') as response:

            if response.status_code != 200 and response.status_code != 404:
                response.failure("error creating organization")
                raise RescheduleTask()

        time.sleep(5)
        with self.client.put('/organization',
            json={"o_id": f"{o_id}", "name": "test2","description4": "tests","tags": ["tag"],"department": "INSO","status": False,"highlights": []},
            headers=self.headers) as response:

            if response.status_code != 200:
                response.failure("error editing organization")
                raise RescheduleTask()

        time.sleep(2)
        # with self.client.delete(f'/organization/{o_id}', headers=self.headers, name='/organization/{id}',) as response:
        with self.client.request('DELETE',f'/organization/{o_id}', headers=self.headers, name='/organization/{id}',) as response:
            if response.status_code != 200:
                response.failure("error deleting organization")
                raise RescheduleTask()

    @task()
    def get_my_organizations(self):
        with self.client.get('/my-organizations', headers=self.headers, catch_response=True) as response:
            if response.status_code != 200:
                response.failure("error getting my organizations")
            
            if len(response.json()) == 0:
                raise RescheduleTask()

    @task()
    def add_and_delete_organization_highlight(self):
        o_id = oh_id = None   

        with self.client.post("/organization", 
            json={"name": "test","description": "tests","tags": ["s","tag"],"department": "INSO","status": False,"highlights": []},
            headers=self.headers,
            catch_response=True) as response:

            o_id = response.json()['o_id']

        time.sleep(2)
        with self.client.post(f'/organization/{o_id}/highlight', 
            json={'title':'test','description':'test'},
            headers=self.headers, name='/organization/{id}/highlight') as response:

            if response.status_code != 200:
                response.failure("error adding organization highlight")
                raise RescheduleTask()

            oh_id = response.json()['highlights'][0]['oh_id']

        time.sleep(2)
        with self.client.request('DELETE', f'/organization/{o_id}/highlight/{oh_id}',
            json={'title':'test','description':'test'},
            headers=self.headers, name='/organization/{id}/highlight/{id}',
            catch_response=True) as response:

            if response.status_code != 200:
                response.failure("error deleting organization highlight")
                raise RescheduleTask()

    def on_start(self):
        i = uuid.uuid4()

        with self.client.post("/register", json={"name": f"user_{i}", "username": f"user_{i}", "email": f"user{i}@mail.com", "password": "password"}, catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f'register: response.status_code = {response.status_code}, expected 200')

        time.sleep(2)
        response = self.client.post("/token", {"username":f"user_{i}", "password":"password"})

        access_token = response.json()['access_token']
        self.headers = {'Authorization': 'Bearer ' + access_token}
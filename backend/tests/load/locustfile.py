import time
import uuid
from locust import HttpUser, task, between, FastHttpUser
from locust.exception import RescheduleTask

#NOTE: Only run with testing db

class QuickstartUser(FastHttpUser):
    wait_time = between(2, 10)

    @task(5)
    def get_organizations(self):
        with self.client.get("/organization",catch_response=True) as response:
            if response.status_code != 200:
                raise RescheduleTask()

    @task(2)
    def create_organization(self):
        with self.client.post("/organization", 
            json={"name": "test","description": "tests","tags": ["s","tag"],"department": "INSO","status": False,"highlights": []},
            headers=self.headers,
            catch_response=True) as response:
            
            if response.status_code != 200:
                response.failure("error creating organization")
                raise RescheduleTask()

    @task()
    def edit_organization(self):
        with self.client.get('/my-organizations', headers=self.headers, catch_response=True) as response:
            if response.status_code != 200:
                response.failure("error getting my organizations")
            
            if len(response.json()) == 0:
                raise RescheduleTask()

            o_id = response.json()[0]["o_id"]

        with self.client.put(f'/organization/{o_id}',
            json={"name": "test2","description4": "tests","tags": ["tag"],"department": "INSO","status": False,"highlights": []},
            headers=self.headers, name='/organization/{id}') as response:

            if response.status_code != 200:
                response.failure("error editing organization")
                raise RescheduleTask()

    @task()
    def delete_organization(self):
        with self.client.get('/my-organizations', headers=self.headers, catch_response=True) as response:
            if response.status_code != 200:
                response.failure("error getting my organizations")
            
            if len(response.json()) == 0:
                raise RescheduleTask()

            o_id = response.json()[0]["o_id"]

            with self.client.request('DELETE',f'/organization/{o_id}', headers=self.headers, name='/organization/{id}',) as response:
                if response.status_code != 200:
                    response.failure("error deleting organization")
                    raise RescheduleTask()            

    @task(5)
    def get_my_organizations(self):
        with self.client.get('/my-organizations', headers=self.headers, catch_response=True) as response:
            if response.status_code != 200:
                response.failure("error getting my organizations")
            
            if len(response.json()) == 0:
                raise RescheduleTask()

    @task()
    def get_my_organizations_member(self):
        with self.client.get('/my-organizations-member', headers=self.headers, catch_response=True) as response:
            if response.status_code != 200:
                response.failure("error getting my organizations")
            
            if len(response.json()) == 0:
                raise RescheduleTask()

    @task(2)
    def add_member_info(self):
        with self.client.get('/my-organizations', headers=self.headers, catch_response=True) as response:
            if response.status_code != 200:
                response.failure("error getting my organizations")
            
            if len(response.json()) == 0:
                raise RescheduleTask()

            o_id = response.json()[0]["o_id"]

        with self.client.post(f'/organization/{o_id}/member-information',
            json={"name": "test2","email": "tests@mail.com","links": ["tag"]},
            headers=self.headers, name='/organization/{id}/member-information') as response:

            if response.status_code != 200:
                response.failure("error adding member info")
                raise RescheduleTask()

            m_id = response.json()["m_id"]

        with self.client.get(f'/member-information/{m_id}', name='/meber-information') as response:
            if response.status_code != 200:
                response.failure("error getting member info")
                raise RescheduleTask()

    @task(2)
    def add_member_info_user(self):
        with self.client.post(f'/user/member-information',
            json={"name": "test2","email": "tests@mail.com","links": ["tag"]},
            headers=self.headers, name='/user/member-information') as response:

            if response.status_code != 200:
                response.failure("error adding member info")
                raise RescheduleTask()

    @task(2)
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

        # time.sleep(2)
        response = self.client.post("/token", {"username":f"user_{i}", "password":"password"})

        access_token = response.json()['access_token']
        self.headers = {'Authorization': 'Bearer ' + access_token}
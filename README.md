# Simple React-Django application

Simple client-server application for sharing photos. This is an exercise project.

## Frontend

The frontend is a standard React app (bootstrapped with `npx create-react-app <app-name>`).

### Requirements

Make a photo sharing app with React, inspired by the shared screenshots.

- Visitors should be able to view all photos
- User should be able to log in
- User should be able to upload a photo with description
- User should be able to view own photos
- User should be able to edit own photo description
- User should be able to navigate listed photos (20 photos per page)
- User should be able to navigate own photos from a photo detail view (next/prev)
- Next/prev navigation should be disabled on direct photo detail view access
- User should be able to log out
- Web client should be responsive

Routes map:
- `/photos/`: list all photos from all users
  - `/photos/id/`: show single photo details
- `/profile/`[^1]: lists all photos uploaded by the logged in user
  - `/profile/id/`[^1]: show single photo details
- `/upload/`[^1]: form to upload a photo
- `/login/`: log in form

[^1]: Protected routes, only accessible by logged in users.

Authentication is done with JWT. For the purpose of this project, you may store
the access and refresh tokens in the local storage.


## Backend

The backend part is a Python API built with

- Django
- Django REST framework

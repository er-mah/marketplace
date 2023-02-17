# este código autentica las credenciales y obtiene un token de acceso para la API de Google Analytics.


from oauth2client.service_account import ServiceAccountCredentials
import os
# The scope for the OAuth2 request.
SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'

# The location of the key file with the key data.
KEY_FILEPATH = os.path.dirname(os.path.abspath(__file__))+'/miautohoy-204514-f6c1fd317343.json'


# Defines a method to get an access token from the ServiceAccount object.
def get_access_token():
  return ServiceAccountCredentials.from_json_keyfile_name(
      KEY_FILEPATH, SCOPE).get_access_token().access_token

print (get_access_token())

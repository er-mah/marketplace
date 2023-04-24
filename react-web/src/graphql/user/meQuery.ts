import {gql} from "@apollo/client";

// Query that helps return authenticated user's data
export const ME_QUERY = gql`
    query Me {
        me {
            id
            email
            first_name
            last_name
            address
            phone
            profile_image
            dni
            is_admin
            is_agency_representative
            is_email_verified
            is_account_disabled
            createdAt
            updatedAt
            deletedAt
            locality_id
        }
    }
`
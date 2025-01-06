export const documentPrompts = {
  form_6: `Analyze this Form 6 (Appointment of Real Estate Agent) and extract:
    1. Property address
    2. Seller details (name, contact info)
    3. Commission rate and structure
    4. Listing period start and end dates
    5. Special conditions or terms
    6. Marketing budget and activities
    7. Price range or listing price
    Return a JSON object with these fields.`,
  
  rates_notice: `Analyze this rates notice and extract:
    1. Property details (address, lot number)
    2. Assessment number
    3. Rates amount and breakdown
    4. Due date
    5. Payment options
    6. Any discounts or concessions
    7. Land valuation details
    Return a JSON object with these fields.`,
  
  tenancy_agreement: `Analyze this tenancy agreement and extract:
    1. Property address
    2. Tenant details (all tenants)
    3. Lease period (start and end dates)
    4. Rent amount and payment frequency
    5. Bond amount
    6. Special conditions
    7. Included utilities and services
    8. Pet clauses
    9. Maintenance responsibilities
    Return a JSON object with these fields.`,
  
  key_record: `Analyze this key record and extract:
    1. Property address
    2. Key identification numbers
    3. Key holder details
    4. Date issued
    5. Security system details
    6. Access restrictions
    7. Key return requirements
    Return a JSON object with these fields.`,
  
  title_search: `Analyze this title search document and extract:
    1. Property details (lot, plan numbers)
    2. Registered owner(s)
    3. Encumbrances and mortgages
    4. Easements
    5. Caveats
    6. Title reference
    7. Last sale details
    8. Zoning information if available
    Return a JSON object with these fields.`,
  
  contract_draft: `Analyze this contract draft and extract:
    1. Property details
    2. Seller information
    3. Buyer information
    4. Purchase price
    5. Deposit amount and terms
    6. Settlement period
    7. Special conditions
    8. Included/excluded fixtures
    9. Building and pest inspection clauses
    10. Finance clauses
    Return a JSON object with these fields.`
}
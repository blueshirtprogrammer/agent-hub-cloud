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
  
  form_9: `Analyze this Form 9 (Sale of Residential Property) and extract:
    1. Property details (address, lot number)
    2. Seller information
    3. Buyer information
    4. Purchase price
    5. Deposit details
    6. Settlement period
    7. Special conditions
    8. Included chattels
    9. Finance conditions
    10. Building and pest inspection conditions
    Return a JSON object with these fields.`,
  
  form_30c: `Analyze this Form 30C (Residential Tenancy Agreement) and extract:
    1. Property address
    2. Landlord details
    3. Tenant details
    4. Rent amount and payment frequency
    5. Bond amount
    6. Tenancy start and end dates
    7. Special conditions
    8. Included utilities
    9. Pet clauses
    10. Maintenance responsibilities
    Return a JSON object with these fields.`,
  
  form_1a: `Analyze this Form 1A (Entry Condition Report) and extract:
    1. Property address
    2. Inspection date
    3. Property condition details by room
    4. Cleanliness assessment
    5. Maintenance issues
    6. Required repairs
    7. Photo references
    Return a JSON object with these fields.`,
  
  form_12: `Analyze this Form 12 (Property Occupancy Certificate) and extract:
    1. Property details
    2. Occupancy date
    3. Building classification
    4. Approved use
    5. Maximum occupancy
    6. Fire safety compliance
    7. Certification details
    Return a JSON object with these fields.`,
  
  form_27c: `Analyze this Form 27C (Selling Agency Agreement) and extract:
    1. Agency details
    2. Property address
    3. Seller information
    4. Commission structure
    5. Marketing plan
    6. Agreement duration
    7. Special conditions
    Return a JSON object with these fields.`,
  
  form_18a: `Analyze this Form 18A (General Tenancy Agreement) and extract:
    1. Property details
    2. Landlord information
    3. Tenant information
    4. Rent and bond details
    5. Tenancy period
    6. Special terms
    7. Included utilities
    8. Pet agreements
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
    Return a JSON object with these fields.`,

  form_14: `Analyze this Form 14 (Information Statement) and extract:
    1. Property details
    2. Body corporate information
    3. Levies and charges
    4. Insurance details
    5. By-laws summary
    6. Maintenance schedule
    7. Sinking fund details
    Return a JSON object with these fields.`,

  form_24: `Analyze this Form 24 (Property Transfer) and extract:
    1. Property details
    2. Transferor details
    3. Transferee details
    4. Consideration amount
    5. Transfer type
    6. Execution details
    7. Duty information
    Return a JSON object with these fields.`,

  form_32a: `Analyze this Form 32A (Property Management Agreement) and extract:
    1. Property details
    2. Owner information
    3. Agent details
    4. Management fees
    5. Services included
    6. Agreement duration
    7. Special conditions
    Return a JSON object with these fields.`
}
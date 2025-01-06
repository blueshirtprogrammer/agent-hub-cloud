export function calculateConfidenceScore(analysis: Record<string, any>): number {
  const expectedFields = {
    form_6: ['property_address', 'seller_details', 'commission_rate', 'listing_period'],
    rates_notice: ['property_details', 'assessment_number', 'rates_amount', 'due_date'],
    tenancy_agreement: ['property_address', 'tenant_details', 'lease_period', 'rent_amount'],
    key_record: ['property_address', 'key_identification', 'key_holder', 'date_issued'],
    title_search: ['property_details', 'registered_owners', 'encumbrances', 'title_reference'],
    contract_draft: ['property_details', 'purchase_price', 'deposit_amount', 'settlement_period']
  }

  const documentType = analysis.document_type
  if (!documentType || !expectedFields[documentType as keyof typeof expectedFields]) {
    return 0.5 // Default score for unknown document types
  }

  const expectedFieldsList = expectedFields[documentType as keyof typeof expectedFields]
  const foundFields = expectedFieldsList.filter(field => 
    analysis[field] !== undefined && analysis[field] !== null && analysis[field] !== ''
  )

  return foundFields.length / expectedFieldsList.length
}
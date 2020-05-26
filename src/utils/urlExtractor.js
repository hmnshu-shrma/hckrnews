function stripUrl (args) {
  if (args === null || args === '') return 'no url found'
  var matches = args.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/, '$1')
  return matches
}
export default stripUrl

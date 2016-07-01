# digitalocean-api

A light wrapper around the DigitalOcean REST API. Currently a WIP with a few things to do. Should be functional now but use at your own risk.

## API

Construct a client with your API key.
```javascript
var digitalocean = require("digitalocean-api")
var apikey = ...
var client = digitalocean(apikey)
```

### Account
* `client.account.getInformation()`

### Actions
* `client.actions.list([queryParams])`
* `client.actions.get(id)`

### Domains
* `client.domains.list([query])`
* `client.domains.create(form)`
* `client.domains.get(id)`
* `client.domains.destroy(id)`
* `client.domains.listRecords([query])`
* `client.domains.createRecord(form)`
* `client.domains.getRecord(id)`
* `client.domains.updateRecord(id, form)`
* `client.domains.destroyRecord(id)`

### Droplets
* `client.droplets.create(form)`
* `client.droplets.get(id)`
* `client.droplets.list([query])`
* `client.droplets.listKernels([query])`
* `client.droplets.listSnapshots([query])`
* `client.droplets.listBackups([query])`
* `client.droplets.listActions([query])`
* `client.droplets.destroy(id)`
* `client.droplets.destroyByTag(tag)`
* `client.droplets.listNeighbors([query])`

### Images
* `client.images.list([query])`
* `client.images.get(id)`
* `client.images.update(id[, form])`
* `client.images.destroy(id)`
* `client.images.transfer(id[, form])`
* `client.images.convert(id[, form])`
* `client.images.listActions(imageId[, form])`
* `client.images.getAction(imageId, actionId[, form])`

### SSH
* `client.ssh.list([query])`
* `client.ssh.create(form)`
* `client.ssh.get(id)`
* `client.ssh.update(id[, form])`
* `client.ssh.destroy(id)`

### Regions
* `client.regions.list([query])`

### Sizes
* `client.sizes.list([query])`

### Floating IPS
* `client.floatingIPs.list([query])`
* `client.floatingIPs.create(form)`
* `client.floatingIPs.get(id)`
* `client.floatingIPs.update(id[, form])`
* `client.floatingIPs.destroy(id)`
* `client.floatingIPs.assign(id[, form])`
* `client.floatingIPs.unassign(id[, form])`
* `client.floatingIPs.listActions(imageId[, form])`
* `client.floatingIPs.getAction(imageId, actionId[, form])`

### Tags
* `client.tags.create(form)`
* `client.tags.get(id)`
* `client.tags.list([query])`
* `client.tags.update(id, form)`
* `client.tags.tag(id, form)`
* `client.tags.untag(id, form)`
* `client.tags.destroy(id)`
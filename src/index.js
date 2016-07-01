const Promise = require("bluebird"),
      request = require("superagent")

module.exports =  (key) => {
  if (!key) {
    throw { name: "MissingKeyError", message: `You must provide a valid DigitalOcean API Key. Received: ${key}` }
  }

  const query = (method, path, qs, form, bodyKey) => new Promise((resolve, reject) => {
    let req = request(method, `https://api.digitalocean.com/v2/${path}`)
      .type("json")
      .accept("json")
      .set("Authorization", `Bearer ${key}`)
    if (qs)
      req = req.query(qs)
    if (form)
      req = req.send(form)
    req.end((err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.body[bodyKey])
      }
    })
  })
  const buildList = (resource, key) => (qs) => query("GET", `/${resource}`, qs, null, key)
  const buildNestedList = (parent, child, key) => (id, qs) => query("GET", `/${parent}/${id}/${child}`, qs, null, key)
  const buildGet = (resource, key) => (id) => query("GET", `/${resource}/${id}`, null, null, key)
  const buildNestedGet = (parent, child, key) => (parentId, childId) => query("GET", `/${parent}/${parentId}/${child}/${childId}`, null, null, key)
  const buildCreate = (resource, key) => (form) => query("POST", `/${resource}`, null, form, key)
  const buildNestedCreate = (parent, child, key) => (id, form) => query("POST", `/${parent}/${id}/${child}`, null, form, key)
  const buildUpdate = (resource, key) => (id, form) => query("PUT", `/${resource}/${id}`, null, form, key)
  const buildNestedUpdate = (parent, child, key) => (parentId, childId, form) => query("GET", `/${parent}/${parentId}/${child}/${childId}`, null, form, key)
  const buildDestroy = (resource) => (id) => query("DELETE", `/${resource}/${id}`, null, null, null)
  const buildDestroyByTag = (resource) => (tag) => query("DELETE", `/${resource}`, { tag_name: tag }, null, null)
  const buildNestedDestroy = (parent, child) => (parentId, childId) => query("DELETE", `/${parent}/${parentId}/${child}/${childId}`, null, null, null)
  const buildAction = (resource, type) => (id, form = {}) => query("POST", `${resource}/${id}/actions`, null, Object.assign({}, form, { type }), "action")
  const buildActionTag = (resource, type) => (tag, form = {}) => query("POST", `${resource}/actions`, { tag_name: tag }, Object.assign({}, form, { type }), "action")

  return {
    account: {
      getInformation: () => query("GET", "account", null, null, "account")
    },
    actions: {
      list: buildList("actions", "actions"),
      get: buildGet("actions", "action")
    },
    domains: {
      list: buildList("domains", "domains"),
      create: buildList("domains", "domain"),
      get: buildGet("domains", "domain"),
      destroy: buildDestroy("domains"),
      listRecords: buildNestedList("domains", "records", "domain_records"),
      createRecord: buildNestedCreate("domains", "records", "domain_record"),
      getRecord: buildNestedGet("domains", "records", "domain_record"),
      updateRecord: buildNestedUpdate("domains", "records", "domain_record"),
      destroyRecord: buildNestedDestroy("domains", "records")
    },
    droplets: {
      create: buildCreate("droplets", "droplet"),
      get: buildGet("droplets", "droplet"),
      list: buildList("droplets", "droplets"),
      listKernels: buildNestedList("droplets", "kernels", "kernels"),
      listSnapshots: buildNestedList("droplets", "snapshots", "snapshots"),
      listBackups: buildNestedList("droplets", "backups", "backups"),
      listActions: buildNestedList("droplets", "actions", "actions"),
      destroy: buildDestroy("droplets"),
      destroyByTag: buildDestroyByTag("droplets"),
      listNeighbors: buildNestedList("droplets", "neighbors", "neighbors"),
      enableBackups: buildAction("droplets", "enable_backups"),
      disableBackups: buildAction("droplets", "disable_backups"),
      reboot: buildAction("droplets", "reboot"),
      powerCycle: buildAction("droplets", "power_cycle"),
      shutdown: buildAction("droplets", "shutdown"),
      powerOff: buildAction("droplets", "power_off"),
      powerOn: buildAction("droplets", "power_on"),
      restore: buildAction("droplets", "restore"),
      passwordReset: buildAction("droplets", "password_reset"),
      resize: buildAction("droplets", "resize"),
      rebuild: buildAction("droplets", "rebuild"),
      rename: buildAction("droplets", "rename"),
      changeKernel: buildAction("droplets", "change_kernel"),
      enableIPV6: buildAction("droplets", "enable_ipv6"),
      enablePrivateNetworking: buildAction("droplets", "enable_private_networking"),
      snapshot: buildAction("droplets", "snapshot"),
      powerCycleByTag: buildActionTag("droplets", "power_cycle"),
      powerOnByTag: buildActionTag("droplets", "power_on"),
      powerOffByTag: buildActionTag("droplets", "power_off"),
      shutdownByTag: buildActionTag("droplets", "shutdown"),
      enablePrivateNetworkingByTag: buildActionTag("droplets", "enable_private_networking"),
      enableIPV6ByTag: buildActionTag("droplets", "enable_ipv6"),
      enableBackupsByTag: buildActionTag("droplets", "enable_backups"),
      disableBackupsByTag: buildActionTag("droplets", "disable_backups"),
      snapshotByTag: buildActionTag("droplets", "snapshot"),
      getAction: buildNestedGet("droplets", "actions", "action")
    },
    images: {
      list: buildList("images", "images"),
      get: buildGet("images", "image"),
      update: buildUpdate("images", "image"),
      destroy: buildDestroy("images"),
      transfer: buildAction("images", "transfer"),
      convert: buildAction("images", "convert"),
      listActions: buildNestedList("images", "actions", "actions"),
      getActions: buildNestedGet("images", "actions", "action")
    },
    ssh: {
      list: buildList("account/keys", "ssh_keys"),
      create: buildCreate("account/keys", "ssh_key"),
      get: buildGet("account/keys", "ssh_key"),
      update: buildUpdate("account/keys", "ssh_key"),
      destroy: buildDestroy("account/keys")
    },
    regions: {
      list: buildList("regions", "regions")
    },
    sizes: {
      list: buildList("sizes", "sizes")
    },
    floatingIPs: {
      list: buildList("floating_ips", "floating_ips"),
      create: buildCreate("floating_ips", "floating_ip"),
      get: buildGet("floating_ips", "floating_ip"),
      destroy: buildDestroy("floating_ips"),
      assign: buildAction("floating_ips", "assign"),
      unassign: buildAction("floating_ips", "unassign"),
      listActions: buildNestedList("floating_ips", "actions", "action"),
      getAction: buildNestedGet("floating_ips", "actions", "action")
    },
    tags: {
      create: buildCreate("tags", "tag"),
      get: buildGet("tags", "tag"),
      list: buildList("tags", "tags"),
      update: buildUpdate("tags", "tag"),
      tag: buildNestedCreate("tags", "resources"),
      untag: (parentId, form) => query("DELETE", `tags/${parentId}/resources`, null, form, null),
      destroy: buildDestroy("tags")
    }
  }
}

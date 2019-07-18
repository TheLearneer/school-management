# Permissions

**NOTE: This is just an idea at the moment, and yet is to be implemented**

Permission bit value used to provide features to users based on their permission bit flags.

| permission | value | description |
| ---------- | ----- | ----------- |
| MANAGE_INSTITUTE | `0x00000001` | Add/Remove Institute |
| EDIT_INSTITUTE | `0x00000002` | Update Institute Details |
| MANAGE_ADMINS | `0x00000004` | Add/Remove super admins |
| MANAGE_INSTITUTE_PERMISSIONS | `0x00000008` | Update permissions for a institute i.e. add users affiliated |
| MANAGE_NOTICE | `0x00000010` | Add/Remove Institute notices |

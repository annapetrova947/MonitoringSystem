SELECT
  groups.caption as group_name, 
  nodes.caption as node_name, 
  statuses.color as status_color, 
  statuses.description as status_description, 
statuses.id as statuses_id, 
  interfaces.caption as interface_name, 
  interfaces.status as interface_status,
  applications.caption as app_name,
  users.firstname,
  users.lastname, 
  users.email
FROM groups JOIN groups_nodes ON groups.id = groups_nodes.group_id
JOIN nodes ON groups_nodes.node_id = nodes.id
JOIN statuses ON nodes.status = statuses.id
LEFT JOIN interfaces ON nodes.interface = interfaces.id
JOIN nodes_applications ON nodes.id = nodes_applications.node_id
JOIN applications ON nodes_applications.application_id = applications.id
JOIN users on nodes.admin = users.id
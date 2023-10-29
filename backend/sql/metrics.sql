SELECT nodes.caption,
metrics.datetime,
metrics.cpu_utilization, 
metrics.disk_utilization, 
metrics.memory_utilization
 from metrics
JOIN nodes ON metrics.node_id = nodes.id
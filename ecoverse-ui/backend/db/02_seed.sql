MERGE INTO reward_catalog target
USING (
  SELECT 'r1' id, 'Free compost bag' name, 100 cost, '🌱' icon, 1 display_order FROM dual UNION ALL
  SELECT 'r2', 'Reusable shopping bag', 200, '🛍️', 2 FROM dual UNION ALL
  SELECT 'r3', 'Steel bottle', 500, '🧴', 3 FROM dual UNION ALL
  SELECT 'r4', 'Home compost bin', 1000, '🗑️', 4 FROM dual UNION ALL
  SELECT 'r5', 'Smart bin upgrade', 2500, '📦', 5 FROM dual
) source
ON (target.id = source.id)
WHEN MATCHED THEN
  UPDATE SET
    target.name = source.name,
    target.cost = source.cost,
    target.icon = source.icon,
    target.display_order = source.display_order
WHEN NOT MATCHED THEN
  INSERT (id, name, cost, icon, display_order)
  VALUES (source.id, source.name, source.cost, source.icon, source.display_order);

COMMIT;

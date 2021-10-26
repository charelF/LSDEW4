import json
import random

j = json.loads(open("hourlyData.json").read().strip())

for i in range(24):
    per_hour = []
    for point in j['result']:
        per_hour.append({
            "x": point['x'],
            "y": random.randint(0, 100000)
        })
    open(f"hourlyData-{i}.json", "w").write(json.dumps({"result": per_hour}))
from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# In-memory students and groups (sample data)
students = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"},
    {"id": 4, "name": "David"},
    {"id": 5, "name": "Eve"}
]

groups = [
    {"id": 1, "groupName": "Group 1", "members": [1, 2, 3]},
    {"id": 2, "groupName": "Group 2", "members": [4, 5]},
]

# Routes implementation

# Get all groups
@app.route('/api/groups', methods=['GET'])
def get_groups():
    return jsonify(groups)

# Get all students
@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify(students)

# Create a new group (can only add existing student IDs)
@app.route('/api/groups', methods=['POST'])
def create_group():
    group_data = request.json
    group_name = group_data.get("groupName")
    member_ids = group_data.get("members", [])

    if not group_name:
        abort(400, "Group name is required")

    new_id = max([g["id"] for g in groups]) + 1 if groups else 1

    # Validate that all members exist
    valid_members = []
    for sid in member_ids:
        student = next((s for s in students if s["id"] == sid), None)
        if not student:
            abort(400, f"Student {sid} does not exist")
        valid_members.append(sid)

    new_group = {
        "id": new_id,
        "groupName": group_name,
        "members": valid_members
    }
    groups.append(new_group)
    return jsonify(new_group), 201

# Delete a group
@app.route('/api/groups/<int:group_id>', methods=['DELETE'])
def delete_group(group_id):
    global groups
    groups = [g for g in groups if g["id"] != group_id]
    return '', 204

# Get details of a single group (with member info)
@app.route('/api/groups/<int:group_id>', methods=['GET'])
def get_group(group_id):
    group = next((g for g in groups if g["id"] == group_id), None)
    if not group:
        abort(404, "Group not found")

    member_details = [s for s in students if s["id"] in group["members"]]
    return jsonify({
        "id": group["id"],
        "groupName": group["groupName"],
        "members": member_details
    })

# Add a student to a group
@app.route('/api/groups/<int:group_id>/add', methods=['PUT'])
def add_student_to_group(group_id):
    group = next((g for g in groups if g["id"] == group_id), None)
    if not group:
        abort(404, "Group not found")

    data = request.json
    student_id = data.get("studentId")
    if not student_id:
        abort(400, "studentId is required")

    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        abort(404, f"Student {student_id} not found")

    if student_id in group["members"]:
        abort(400, f"Student {student_id} already in group {group_id}")

    group["members"].append(student_id)
    return jsonify(group), 200


if __name__ == '__main__':
    app.run(port=3902, debug=True)

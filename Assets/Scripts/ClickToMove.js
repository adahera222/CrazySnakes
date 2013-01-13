#pragma strict

var speed:int;
var isSelected:boolean;
var mainCamera:Camera;

private var targetPosition:Vector3;

function Start () {
	targetPosition = this.transform.position;
	if(this.GetComponent("Selectable") == null)
		isSelected = true;
}

function Update () {
	rigidbody.constraints &= ~RigidbodyConstraints.FreezeAll;
	if(Input.GetKeyDown(KeyCode.Mouse1))
	{
		var playerPlane = new Plane(Vector3.up, transform.position);
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		var hitdist = 0.0;
		
		if(playerPlane.Raycast(ray,hitdist))
		{
			var targetPoint = ray.GetPoint(hitdist);
			targetPosition = ray.GetPoint(hitdist);
			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
			transform.rotation = targetRotation;
		}
	}
	
	if((transform.position.x > targetPosition.x - 0.01 && transform.position.x < targetPosition.x + 0.01)
		&& (transform.position.z > targetPosition.z - 0.01 && transform.position.z < targetPosition.z + 0.01))
	{
		targetPosition = transform.position;
	}
	else
	{
		transform.position = Vector3.MoveTowards(transform.position, targetPosition, Time.deltaTime * speed);
	}
	transform.rotation.x = 0;
	transform.rotation.z = 0;
}
/*
function OnCollisionEnter(collisionInfo:Collision)
{
	networkView.RPC("Die",RPCMode.All);
/*
	if(collisionInfo.gameObject.CompareTag("Wall"))
	{
		var absoluteDirection = (collisionInfo.gameObject.transform.position - this.transform.position);
		transform.position += Vector3(-0.05 * absoluteDirection.x, 0, -0.05 * absoluteDirection.z);
		targetPosition = transform.position;
		rigidbody.constraints = RigidbodyConstraints.FreezeAll;
	}

}*/
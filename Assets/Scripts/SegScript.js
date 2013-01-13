#pragma strict

var MoveList:Array = new Array();
var Direction:Vector3;
var speed:int;
var headObj:GameObject;
private var targetPosition:Vector3;
private var err:float = 0.05;

function Start ()
{

}

function Update ()
{
	if(MoveList.length == 0)
	{
		transform.position += speed * Direction * Time.deltaTime;
	}
	else
	{
		if((transform.position.x > targetPosition.x - err && transform.position.x < targetPosition.x + err)
			&& (transform.position.z > targetPosition.z - err && transform.position.z < targetPosition.z + err))
		{
			this.transform.position = targetPosition;
			targetPosition = MoveList.Shift();
			this.transform.rotation = Quaternion.LookRotation(targetPosition - transform.position);
		}
		else
		{
			this.transform.position = Vector3.MoveTowards(this.transform.position, targetPosition, Time.deltaTime * speed);
		}
		transform.rotation.x = 0;
		transform.rotation.z = 0;
	}
}
#pragma strict

var speed:int = 10;

function Start ()
{
	if(!networkView.isMine)
	{
		enabled = false;
	}
}

function Update ()
{
	var Direction = new Vector3(Input.GetAxis("Horizontal"),0,Input.GetAxis("Vertical"));
	transform.position += speed * Direction * Time.deltaTime;
}

function OnCollisionEnter(collisionInfo:Collision)
{
	if(collisionInfo.collider.gameObject.CompareTag("Wall"))
	{
		networkView.RPC("Die",RPCMode.All);
	}
}

@RPC
function Die() 
{
	Destroy(this.gameObject);
}
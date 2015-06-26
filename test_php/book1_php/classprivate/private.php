<?
	class employee{
		private   $sal=3000;
// 		protected $sal=3000;
		public function getSal(){		
			return $this->sal;
		}	
	}
	
	class Manager extends employee {
		private   $sal=5000;
		//重写过的方法
		public function getSal(){		
			return $this->sal;
		}
		public function getParentSal(){
			//这里返回的是父类的private属性.
			return parent::getSal();
		}
	}
	$manager = new Manager();
	echo "PHP ".phpversion()."<br>";
	echo $manager->getSal();
	echo "<br>";
	echo "parent's \$sal ".$manager->getParentSal();